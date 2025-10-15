/**
 * Test the full conversation flow including budget and notification
 */

async function testConversation() {
  const baseUrl = 'http://localhost:3000/api/orchestrate';
  let sessionId = 'test-' + Date.now();
  
  console.log('🚀 Starting full conversation test...\n');
  
  // Test messages simulating a real conversation
  const messages = [
    "Hi, I'm interested in automating my lead generation",
    "My name is Sarah, I run a marketing agency",
    "We're struggling with manual outreach and follow-ups, it takes too much time",
    "We need this solved within the next month",
    "Our budget is around $50k for this project",
    "sarah@marketingagency.com"
  ];
  
  for (const message of messages) {
    console.log(`👤 User: ${message}`);
    
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId,
        message,
        conversationType: 'chat'
      })
    });
    
    const data = await response.json();
    // Extract the last AI message from the response
    const aiMessage = data.response || 
                     data.messages?.filter((m: any) => m._type === 'ai' || m.type === 'ai').pop()?.content ||
                     data.messages?.slice(-1)[0]?.content;
    console.log(`🤖 Assistant: ${aiMessage || 'No response'}`);
    
    // Debug: show full response on last message
    if (message === "sarah@marketingagency.com") {
      console.log('\n📝 Full Response Data:');
      console.log(JSON.stringify(data, null, 2));
    }
    
    // Check state details - look in state object
    const state = data.state || data;
    
    if (state.qualification) {
      console.log('\n📊 Qualification Status:');
      console.log(`   Score: ${state.qualification.totalScore}/100`);
      console.log(`   Tier: ${state.qualification.tier}`);
      console.log(`   Qualified: ${state.qualification.isQualified}`);
    }
    
    if (state.notificationsSent?.length > 0) {
      console.log('\n📧 Notifications Sent:');
      state.notificationsSent.forEach((n: any) => {
        console.log(`   - ${n.type} to ${n.recipient} (${n.status})`);
      });
    }
    
    if (state.conversationStatus === 'completed') {
      console.log('\n✅ Conversation marked as completed');
      console.log('   Customer Info:', {
        name: state.customerInfo?.name,
        email: state.customerInfo?.email,
        company: state.customerInfo?.company,
        budget: state.customerInfo?.budget
      });
    }
    
    console.log('---\n');
    
    // Add delay between messages
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log('Test complete!');
}

testConversation().catch(console.error);