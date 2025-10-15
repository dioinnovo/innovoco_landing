/**
 * Voice Conversation Flow Audit Script
 * Tests the virtual assistant workflow and monitors console logs
 * to identify why the agent is skipping user responses
 */

const puppeteer = require('puppeteer');

// Configuration
const CONFIG = {
  baseUrl: 'http://localhost:3000',
  waitTimeout: 30000,
  verbose: true,
  slowMo: 100, // Slow down actions to observe behavior
  testScenarios: [
    {
      name: 'Voice Conversation Flow',
      steps: [
        { type: 'startVoice', delay: 2000 },
        { type: 'simulateUserSpeech', text: 'Hi, I need help with automation', delay: 3000 },
        { type: 'waitForResponse', delay: 5000 },
        { type: 'simulateUserSpeech', text: 'We have issues with data entry', delay: 3000 },
        { type: 'waitForResponse', delay: 5000 },
        { type: 'observeEmailRequest', delay: 3000 },
      ]
    }
  ]
};

class VoiceConversationTester {
  constructor() {
    this.browser = null;
    this.page = null;
    this.logs = [];
    this.networkRequests = [];
    this.aiResponses = [];
    this.conversationFlow = [];
  }

  async init() {
    console.log('🚀 Launching browser...');
    this.browser = await puppeteer.launch({
      headless: false, // Show browser for debugging
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      slowMo: CONFIG.slowMo
    });

    this.page = await this.browser.newPage();
    
    // Set viewport
    await this.page.setViewport({ width: 1920, height: 1080 });

    // Enable console logging
    this.page.on('console', msg => {
      const text = msg.text();
      const type = msg.type();
      this.logs.push({ type, text, timestamp: new Date().toISOString() });
      
      if (CONFIG.verbose) {
        console.log(`[Browser ${type}]:`, text);
      }

      // Track conversation flow
      if (text.includes('🎤') || text.includes('🗣️') || text.includes('AI response')) {
        this.conversationFlow.push({
          timestamp: new Date().toISOString(),
          message: text
        });
      }
    });

    // Monitor network requests
    this.page.on('request', request => {
      const url = request.url();
      if (url.includes('/api/orchestrate') || url.includes('/api/realtime') || url.includes('/api/chat')) {
        this.networkRequests.push({
          url,
          method: request.method(),
          timestamp: new Date().toISOString(),
          postData: request.postData()
        });
      }
    });

    // Monitor network responses
    this.page.on('response', async response => {
      const url = response.url();
      if (url.includes('/api/orchestrate') || url.includes('/api/realtime') || url.includes('/api/chat')) {
        try {
          const data = await response.json();
          this.aiResponses.push({
            url,
            status: response.status(),
            timestamp: new Date().toISOString(),
            data
          });
          
          // Log AI response
          if (data.response || data.aiResponse) {
            console.log('\\n📢 AI Response:', data.response || data.aiResponse?.message);
            
            // Check for UI actions
            if (data.uiAction) {
              console.log('🎛️ UI Action:', data.uiAction);
            }
          }
        } catch (e) {
          // Response might not be JSON
        }
      }
    });

    // Handle page errors
    this.page.on('pageerror', error => {
      console.error('❌ Page error:', error.message);
      this.logs.push({ type: 'error', text: error.message, timestamp: new Date().toISOString() });
    });

    console.log('✅ Browser initialized');
  }

  async navigateToSite() {
    console.log(`\\n📍 Navigating to ${CONFIG.baseUrl}...`);
    await this.page.goto(CONFIG.baseUrl, { waitUntil: 'networkidle2' });
    console.log('✅ Page loaded');
  }

  async openVirtualAssistant() {
    console.log('\\n🤖 Opening virtual assistant...');
    
    // Wait for the Siri orb button
    await this.page.waitForSelector('button[aria-label="Open virtual assistant"]', {
      timeout: CONFIG.waitTimeout
    });
    
    // Click the orb
    await this.page.click('button[aria-label="Open virtual assistant"]');
    
    // Wait for chat interface
    await this.page.waitForSelector('.fixed.w-96', {
      timeout: CONFIG.waitTimeout
    });
    
    console.log('✅ Virtual assistant opened');
    
    // Wait for initial greeting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  async startVoiceCall() {
    console.log('\\n📞 Starting voice call...');
    
    // Click the phone button
    const phoneButton = await this.page.$('button[aria-label="Start voice call"]');
    if (!phoneButton) {
      throw new Error('Phone button not found');
    }
    
    await phoneButton.click();
    
    // Wait for connection
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    console.log('✅ Voice call started');
  }

  async injectTranscript(text, role = 'user') {
    console.log(`\\n💬 Injecting ${role} transcript: "${text}"`);
    
    // Get session ID from the page
    const sessionId = await this.page.evaluate(() => {
      return sessionStorage.getItem('chat_session_id');
    });
    
    if (!sessionId) {
      throw new Error('No session ID found');
    }
    
    // Call the sync API directly
    const response = await this.page.evaluate(async (sessionId, text, role) => {
      const response = await fetch('/api/realtime/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          transcript: text,
          role,
          timestamp: new Date().toISOString(),
          metadata: {
            source: 'test_simulation'
          }
        })
      });
      return await response.json();
    }, sessionId, text, role);
    
    console.log('📥 Sync response:', response);
    
    // Wait for processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return response;
  }

  async observeConversation(duration = 10000) {
    console.log(`\\n👀 Observing conversation for ${duration/1000} seconds...`);
    
    const startTime = Date.now();
    
    while (Date.now() - startTime < duration) {
      // Check for UI changes
      const hasTextInput = await this.page.evaluate(() => {
        const input = document.querySelector('input[type="email"], input[type="tel"]');
        return input && input.offsetParent !== null;
      });
      
      if (hasTextInput) {
        console.log('🔔 Text input UI detected!');
        
        // Get input type
        const inputType = await this.page.evaluate(() => {
          const input = document.querySelector('input[type="email"], input[type="tel"]');
          return input ? input.type : null;
        });
        
        console.log(`📝 Input type: ${inputType}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  async analyzeConversationFlow() {
    console.log('\\n📊 Analyzing conversation flow...');
    
    // Analyze AI responses for rapid-fire questions
    const rapidFirePatterns = [];
    
    for (let i = 1; i < this.aiResponses.length; i++) {
      const prev = this.aiResponses[i - 1];
      const curr = this.aiResponses[i];
      
      const timeDiff = new Date(curr.timestamp) - new Date(prev.timestamp);
      
      if (timeDiff < 5000) { // Less than 5 seconds between responses
        rapidFirePatterns.push({
          timeDiff: timeDiff / 1000,
          prevResponse: prev.data.response || prev.data.aiResponse?.message,
          currResponse: curr.data.response || curr.data.aiResponse?.message
        });
      }
    }
    
    if (rapidFirePatterns.length > 0) {
      console.log('\\n⚠️ RAPID-FIRE QUESTIONS DETECTED:');
      rapidFirePatterns.forEach((pattern, i) => {
        console.log(`\\n  Pattern ${i + 1}:`);
        console.log(`  Time between: ${pattern.timeDiff}s`);
        console.log(`  Previous: "${pattern.prevResponse?.substring(0, 100)}..."`);
        console.log(`  Current: "${pattern.currResponse?.substring(0, 100)}..."`);
      });
    }
    
    // Check for missing user inputs
    const userInputs = this.networkRequests.filter(r => 
      r.url.includes('/api/orchestrate') && r.method === 'POST'
    );
    
    console.log(`\\n📈 Total user inputs: ${userInputs.length}`);
    console.log(`📈 Total AI responses: ${this.aiResponses.length}`);
    
    if (this.aiResponses.length > userInputs.length * 1.5) {
      console.log('⚠️ AI is responding more than expected - possible auto-continuation!');
    }
    
    // Analyze conversation state changes
    console.log('\\n🔄 Conversation State Changes:');
    this.aiResponses.forEach((response, i) => {
      if (response.data.metadata) {
        console.log(`  ${i + 1}. Phase: ${response.data.metadata.phase}, Messages: ${response.data.metadata.messageCount}`);
      }
    });
  }

  async runTest() {
    try {
      await this.init();
      await this.navigateToSite();
      await this.openVirtualAssistant();
      
      // Test voice conversation flow
      await this.startVoiceCall();
      
      // Simulate conversation
      console.log('\\n🎭 Starting conversation simulation...');
      
      // User: Initial greeting with challenge
      await this.injectTranscript("Hi, I'm John from ABC Company. We're struggling with manual data entry in our real estate business.", 'user');
      await this.observeConversation(5000);
      
      // Check if AI jumps ahead
      const response1 = this.aiResponses[this.aiResponses.length - 1];
      console.log('\\n🔍 Checking response pattern...');
      if (response1?.data?.response) {
        const text = response1.data.response.toLowerCase();
        if (text.includes('email') && text.includes('phone') || 
            text.includes('what\'s your') && text.includes('and')) {
          console.log('⚠️ ISSUE DETECTED: AI asking multiple questions at once!');
        }
      }
      
      // Continue conversation
      await this.injectTranscript("We spend about 5 hours daily on data entry tasks", 'user');
      await this.observeConversation(5000);
      
      // Analyze the flow
      await this.analyzeConversationFlow();
      
      // Generate report
      await this.generateReport();
      
    } catch (error) {
      console.error('❌ Test failed:', error);
      throw error;
    } finally {
      if (this.browser) {
        console.log('\\n🔚 Test complete. Browser will remain open for inspection.');
        // Keep browser open for manual inspection
        // await this.browser.close();
      }
    }
  }

  generateReport() {
    console.log('\n' + '='.repeat(80));
    console.log('📋 CONVERSATION FLOW AUDIT REPORT');
    console.log('='.repeat(80));
    
    console.log('\n🔍 KEY FINDINGS:');
    
    // Check for conversation jumping
    const hasJumping = this.aiResponses.some(r => {
      const text = (r.data.response || r.data.aiResponse?.message || '').toLowerCase();
      return (text.match(/what's your/g) || []).length > 1 ||
             (text.includes('email') && text.includes('phone') && text.includes('company'));
    });
    
    if (hasJumping) {
      console.log('\\n❌ CRITICAL ISSUE: Agent is asking multiple questions in one response');
      console.log('   This creates an unnatural flow where the agent doesn\'t wait for user responses.');
    }
    
    // Check for UI action timing
    const uiActions = this.aiResponses.filter(r => r.data.uiAction && r.data.uiAction.type !== 'none');
    if (uiActions.length > 0) {
      console.log('\\n🎛️ UI ACTIONS TRIGGERED:');
      uiActions.forEach(action => {
        console.log(`   - ${action.data.uiAction.type} (${action.data.uiAction.inputType || 'N/A'})`);
      });
    }
    
    // Check conversation depth
    console.log(`\\n📊 CONVERSATION METRICS:`);
    console.log(`   - Total exchanges: ${this.aiResponses.length}`);
    console.log(`   - User inputs: ${this.networkRequests.filter(r => r.method === 'POST').length}`);
    console.log(`   - Console logs: ${this.logs.length}`);
    
    console.log('\\n' + '='.repeat(80));
  }
}

// Run the test
async function main() {
  const tester = new VoiceConversationTester();
  try {
    await tester.runTest();
  } catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
  }
}

// Check if puppeteer is installed
try {
  require.resolve('puppeteer');
  main();
} catch (e) {
  console.log('📦 Installing puppeteer...');
  const { execSync } = require('child_process');
  execSync('npm install puppeteer', { stdio: 'inherit', cwd: '/Users/diodelahoz/Projects/innovoco/nextjs-app' });
  console.log('✅ Puppeteer installed. Re-running test...');
  main();
}