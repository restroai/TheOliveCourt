export async function getChatResponse(userInput, menuData) {
    console.log("User Input:", userInput);
    console.log("Menu Data:", menuData);
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
        messages: [
        {
        role: "system",
        content:
            `You are a helpful restaurant assistant. Carefully analyze the menu from these foods - {1. Paneer Tikka, 2. Veg Biryani, 3. Garlic Naan, 4. Butter Chicken, 5. Chicken Tikka Masala, 6. Roti}.  
            When the customer asks for food suggestions: return the values only from the given menu.`
        },
        { role: "user", content: userInput },
        ],
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response";
}