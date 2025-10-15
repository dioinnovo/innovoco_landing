# Realtime Voice Assistant Setup Guide

## Overview
This guide explains how to configure and use the realtime voice-enabled AI assistant integrated with LangGraph workflow orchestration.

## Configuration

### Environment Variables
Create a `.env.local` file in the `nextjs-app` directory with the following variables:

```env
# Option 1: Direct OpenAI (simpler setup)
OPENAI_API_KEY=your_openai_api_key

# Option 2: Azure OpenAI (recommended for production)
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
AZURE_OPENAI_KEY=your_azure_openai_key
AZURE_OPENAI_REALTIME_DEPLOYMENT=gpt-4o-realtime-preview
AZURE_OPENAI_REALTIME_API_VERSION=2024-10-01-preview

# LangGraph Orchestrator Settings
AI_API_KEY=your_openai_or_anthropic_key
AI_MODEL=gpt-4-turbo-preview
```

## Key Features Implemented

### ✅ Audio Infrastructure
- **Fixed audio queue management** - Using single AudioProcessor for clean playback
- **24kHz sample rate** - Matching OpenAI Realtime API requirements
- **Echo cancellation** - Dynamic gain control to prevent feedback loops
- **Low-latency processing** - Optimized buffer sizes for real-time conversation

### ✅ Voice Activity Detection (VAD)
- **Threshold: 0.7** - Balanced sensitivity for speech detection
- **Silence duration: 1500ms** - Natural conversation pauses
- **Prefix padding: 500ms** - Captures beginning of speech reliably
- **Interruption handling** - Smooth transitions when user interrupts AI

### ✅ WebSocket Connection
- **Auto-reconnect** - Exponential backoff with 5 retry attempts
- **Dual provider support** - Works with both Azure and OpenAI
- **Session persistence** - Maintains conversation context across reconnections
- **Error recovery** - Graceful handling of network issues

### ✅ LangGraph Integration
- **Unified conversation type** - Voice and text share same context
- **Real-time sync** - Voice transcripts sync with orchestrator state
- **BANT qualification** - Lead scoring works across voice/text
- **Agent coordination** - All LangGraph agents accessible via voice

### ✅ Debug & Monitoring
- **Visual debug panel** - Shows connection status, audio levels
- **Real-time metrics** - Call duration, connection quality
- **Audio level meters** - Monitor microphone and speaker levels
- **Error display** - Clear error messages for troubleshooting

## Usage Instructions

### Starting a Voice Call

1. **Open the chat widget** - Click the chat bubble in the bottom right
2. **Click the phone icon** - Green phone button starts voice call
3. **Grant microphone access** - Browser will prompt for permission
4. **Start speaking** - AI will respond naturally to your voice

### During the Call

- **Natural conversation** - Speak normally, AI detects when you're done
- **Interruptions work** - You can interrupt the AI mid-response
- **Visual feedback** - See real-time transcripts as you speak
- **Debug panel** - Click bug icon (dev mode) to see audio levels

### Ending the Call

- **Click red phone** - Ends voice call but preserves chat context
- **Continue in text** - Can switch between voice and text seamlessly

## Troubleshooting

### Common Issues & Solutions

#### No Audio Output
- Check browser audio permissions
- Verify speakers/headphones are connected
- Check debug panel for audio level activity

#### Microphone Not Working
- Grant microphone permission when prompted
- Check system audio input settings
- Try refreshing the page

#### Connection Issues
- Verify API keys are configured correctly
- Check network connectivity
- Look for error messages in debug panel

#### Echo/Feedback
- Use headphones instead of speakers
- Reduce speaker volume
- Position microphone away from speakers

### Debug Mode

In development, click the bug icon to see:
- Connection status (Connected/Disconnected)
- Connection quality (Excellent/Good/Poor)
- Microphone level meter
- Speaker level meter
- Real-time error messages

## Architecture

### Audio Flow
```
User Microphone → getUserMedia (24kHz) → ScriptProcessor → 
PCM16 Encoding → WebSocket → OpenAI Realtime API →
PCM16 Response → AudioProcessor Queue → AudioContext → Speakers
```

### State Management
```
useRealtimeVoice Hook → RealtimeClient → WebSocket →
OpenAI/Azure → Transcript Events → LangGraph Sync →
Master Orchestrator → Conversation State → UI Updates
```

## Performance Optimizations

1. **Audio Processing**
   - 2048 sample buffer (low latency)
   - Hardware echo cancellation
   - Dynamic gain adjustment

2. **Network**
   - Binary PCM16 format (efficient)
   - WebSocket persistence
   - Exponential backoff reconnection

3. **State Management**
   - Transcript batching
   - Async orchestrator sync
   - Optimistic UI updates

## Security Considerations

- API keys never exposed to client
- Ephemeral session tokens (when available)
- WebSocket authentication via query params (Azure)
- Session isolation per user

## Next Steps & Improvements

### Potential Enhancements
1. **WebRTC Migration** - Better browser compatibility
2. **Push-to-talk Option** - Alternative to VAD
3. **Language Selection** - Multi-language support
4. **Voice Selection** - Choose from different AI voices
5. **Recording Feature** - Save conversation audio
6. **Noise Gate** - Advanced audio filtering

### Known Limitations
- Requires modern browser with WebSocket support
- Best with headphones to avoid echo
- Requires stable internet connection
- Limited to 24kHz audio quality

## Support

For issues or questions:
1. Check the debug panel for error messages
2. Review browser console for detailed logs
3. Ensure all environment variables are set
4. Verify microphone permissions granted

---

Last Updated: January 2025
Version: 1.0.0