/**
 * Test Script for Fixed Conversation Flow
 * Tests the natural back-and-forth conversation with proper turn-taking
 */

const fetch = require('node-fetch');

// Configuration
const API_URL = 'http://localhost:3003/api/orchestrate';
const DELAY_BETWEEN_MESSAGES = 2000; // 2 seconds between messages

// Test conversation
const testConversation = [
  {
    message: "Hi, I'm John from ABC Company. We're struggling with manual data entry.",
    expectedBehavior: "Should acknowledge and ask ONE follow-up question about challenges"
  },
  {
    message: "We spend about 5 hours daily on repetitive data entry tasks in our real estate business.",
    expectedBehavior: "Should provide insight and ask for email (not multiple questions)"
  },
  {
    message: "john@abccompany.com",
    expectedBehavior: "Should acknowledge email and ask for phone (one question only)"
  },
  {
    message: "555-123-4567",
    expectedBehavior: "Should acknowledge phone and ask for company name (one question only)"
  },
  {
    message: "ABC Real Estate Solutions",
    expectedBehavior: "Should acknowledge company and ask for role (one question only)"
  },
  {
    message: "I'm the Operations Manager",
    expectedBehavior: "Should acknowledge role and ask for company size (one question only)"
  },
  {
    message: "We have about 50 employees",
    expectedBehavior: "Should acknowledge size and ask for timeline (one question only)"
  },
  {
    message: "We're actively comparing solutions right now",
    expectedBehavior: "Should acknowledge timeline and ask about stakeholders (one question only)"
  },
  {
    message: "I'll be making the decision with our CTO",
    expectedBehavior: "Should acknowledge stakeholders and ask about budget (one question only)"
  },
  {
    message: "We're looking at solutions above 100K",
    expectedBehavior: "Should acknowledge budget and provide closing confirmation"
  }
];

class ConversationFlowTester {
  constructor() {
    this.sessionId = `test_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.conversationHistory = [];
  }

  async sendMessage(userMessage) {
    console.log(`\n👤 User: "${userMessage}"`);
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          sessionId: this.sessionId,
          conversationType: 'chat',
          metadata: {
            source: 'test_script',
            testMode: true
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`🤖 Assistant: "${data.response}"`);
      
      // Analyze response
      this.analyzeResponse(data.response);
      
      // Store in history
      this.conversationHistory.push({
        user: userMessage,
        assistant: data.response,
        metadata: data.metadata
      });
      
      return data;
    } catch (error) {
      console.error('❌ Error:', error.message);
      throw error;
    }
  }

  analyzeResponse(response) {
    // Check for multiple questions
    const questionMarks = (response.match(/\?/g) || []).length;
    const hasAnd = /\?.*and.*\?/i.test(response);
    const hasMultipleWhats = (response.match(/what's/gi) || []).length > 1;
    
    if (questionMarks > 1) {
      console.log(`⚠️  WARNING: Response contains ${questionMarks} questions!`);
    }
    
    if (hasAnd) {
      console.log(`⚠️  WARNING: Response chains questions with "and"!`);
    }
    
    if (hasMultipleWhats) {
      console.log(`⚠️  WARNING: Response asks multiple "what's" questions!`);
    }
    
    // Check for proper acknowledgment
    const hasAcknowledgment = /thank you|perfect|great|excellent|awesome|got it/i.test(response);
    if (hasAcknowledgment) {
      console.log(`✅ Response properly acknowledges user input`);
    }
    
    // Check question count
    if (questionMarks === 1 && !hasAnd && !hasMultipleWhats) {
      console.log(`✅ Response asks exactly ONE question`);
    } else if (questionMarks === 0) {
      console.log(`ℹ️  Response is a statement (no question)`);
    }
  }

  async runTest() {
    console.log('=' .repeat(80));
    console.log('🧪 CONVERSATION FLOW TEST - NATURAL TURN-TAKING');
    console.log('=' .repeat(80));
    console.log(`Session ID: ${this.sessionId}`);
    
    for (let i = 0; i < testConversation.length; i++) {
      const test = testConversation[i];
      console.log(`\n📍 Step ${i + 1}/${testConversation.length}`);
      console.log(`Expected: ${test.expectedBehavior}`);
      
      await this.sendMessage(test.message);
      
      // Wait between messages to simulate natural conversation
      if (i < testConversation.length - 1) {
        await this.delay(DELAY_BETWEEN_MESSAGES);
      }
    }
    
    this.generateReport();
  }

  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  generateReport() {
    console.log('\n' + '=' .repeat(80));
    console.log('📊 TEST SUMMARY REPORT');
    console.log('=' .repeat(80));
    
    let issuesFound = 0;
    let successCount = 0;
    
    this.conversationHistory.forEach((turn, index) => {
      const response = turn.assistant;
      const questionMarks = (response.match(/\?/g) || []).length;
      const hasMultipleQuestions = questionMarks > 1 || /\?.*and.*\?/i.test(response);
      
      if (hasMultipleQuestions) {
        issuesFound++;
        console.log(`\n❌ Issue at step ${index + 1}: Multiple questions detected`);
        console.log(`   Response: "${response.substring(0, 100)}..."`);
      } else {
        successCount++;
      }
    });
    
    console.log(`\n📈 Results:`);
    console.log(`   ✅ Successful turns: ${successCount}/${this.conversationHistory.length}`);
    console.log(`   ❌ Problematic turns: ${issuesFound}/${this.conversationHistory.length}`);
    
    if (issuesFound === 0) {
      console.log(`\n🎉 SUCCESS: All responses follow natural turn-taking!`);
    } else {
      console.log(`\n⚠️  ISSUES FOUND: ${issuesFound} responses need improvement`);
    }
    
    console.log('\n' + '=' .repeat(80));
  }
}

// Run the test
async function main() {
  const tester = new ConversationFlowTester();
  
  try {
    await tester.runTest();
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Check if node-fetch is installed
try {
  require.resolve('node-fetch');
  main();
} catch (e) {
  console.log('📦 Installing node-fetch...');
  const { execSync } = require('child_process');
  execSync('npm install node-fetch@2', { 
    stdio: 'inherit', 
    cwd: '/Users/diodelahoz/Projects/innovoco/nextjs-app' 
  });
  console.log('✅ node-fetch installed. Re-running test...');
  main();
}