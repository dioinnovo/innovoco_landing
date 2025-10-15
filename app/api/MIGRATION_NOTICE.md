# API Migration Notice

## Deprecated Endpoints

The following API endpoints are deprecated and will be removed in a future release:

- `/api/chat/azure` - Deprecated
- `/api/chat/callback-agent` - Deprecated  
- `/api/chat/n8n` - Deprecated
- `/api/qualify` - Deprecated

## New Unified Endpoint

All functionality has been consolidated into a single, unified endpoint:

### `/api/orchestrate`

This endpoint provides:
- Natural conversation handling
- Automatic data extraction
- Lead qualification with BANT scoring
- Service recommendations
- Meeting scheduling
- Email notifications
- Analytics tracking

## Migration Guide

### Old Azure Endpoint
```javascript
// OLD
fetch('/api/chat/azure', {
  method: 'POST',
  body: JSON.stringify({ message: text })
})

// NEW
fetch('/api/orchestrate', {
  method: 'POST',
  body: JSON.stringify({ 
    message: text,
    conversationType: 'chat'
  })
})
```

### Old Qualify Endpoint
```javascript
// OLD - Separate qualification call
fetch('/api/qualify', {
  method: 'POST',
  body: JSON.stringify({ transcript: messages })
})

// NEW - Automatic qualification in response
fetch('/api/orchestrate', {
  method: 'POST',
  body: JSON.stringify({ message: text })
})
// Response includes qualification data
```

## Benefits of Migration

1. **Single API call** instead of multiple endpoints
2. **Automatic orchestration** between agents
3. **Session management** built-in
4. **Better performance** with parallel agent execution
5. **Comprehensive analytics** in every response

## Documentation

See `/docs/UNIFIED_LEAD_INTELLIGENCE_SYSTEM.md` for complete documentation.

## Timeline

- **Current**: Both old and new endpoints functional
- **Next Release**: Old endpoints marked as deprecated in responses
- **Future Release**: Old endpoints removed

Please migrate to `/api/orchestrate` as soon as possible.