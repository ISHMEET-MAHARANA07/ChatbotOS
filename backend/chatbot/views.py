from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Count
from django.db.models.functions import TruncDate, TruncMonth

from .models import Message
from .serializers import MessageSerializer
from .bot import get_bot_reply


@api_view(['POST'])
def chat(request):
    text = request.data.get('text', '').strip()

    if not text:
        return Response(
            {'error': 'Message text is required.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    Message.objects.create(sender='user', text=text)

    reply_text = get_bot_reply(text)
    bot_message = Message.objects.create(sender='bot', text=reply_text)

    serializer = MessageSerializer(bot_message)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def messages(request):
    all_messages = Message.objects.all().order_by('created_at')
    serializer = MessageSerializer(all_messages, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def stats(request):
    filter_by = request.query_params.get('filter', 'daily')

    if filter_by == 'monthly':
        trunc_fn = TruncMonth
        date_format = '%b'
    else:
        trunc_fn = TruncDate
        date_format = '%a'

    rows = (
        Message.objects
        .annotate(period=trunc_fn('created_at'))
        .values('period', 'sender')
        .annotate(count=Count('id'))
        .order_by('period')
    )

    combined = {}
    for row in rows:
        key = row['period']
        if key not in combined:
            combined[key] = {'user_count': 0, 'bot_count': 0}
        if row['sender'] == 'user':
            combined[key]['user_count'] = row['count']
        else:
            combined[key]['bot_count'] = row['count']

    result = [
        {
            'date': period.strftime(date_format),
            'user_count': counts['user_count'],
            'bot_count': counts['bot_count'],
        }
        for period, counts in combined.items()
    ]

    return Response(result)
