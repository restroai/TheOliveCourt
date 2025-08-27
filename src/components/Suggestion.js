import {restroAI} from "../utils/cipher";

export async function getChatResponse(userInput, menuData) {
    console.log("User Input:", userInput);
    console.log("Menu Data:", menuData);
    const menuArray = [];

    Object.entries(menuData).forEach(([category, items]) => {
      items.forEach((item, idx) => {
        const tags = [
          item.vegetarian ? "Vegetarian" : null,
          item.spicy ? "Spicy" : null,
          item.popular ? "Popular" : null
        ].filter(Boolean).join(", ");

        menuArray.push(
          `${item.id}. ${item.name} (${category}) - ₹${item.price}${tags ? " | " + tags : ""}`
        );
      });
    });
    console.log("Processed Menu Items:", menuArray);
    const systemContent = `You are a helpful restaurant assistant. Carefully analyze the following menu:\n\n${menuArray.join("\n")}\n\nInstructions:
    - Only suggest items from this menu.
    - Consider category, price, and tags (Vegetarian, Spicy, Popular) when relevant.
    - Always use common sense to interpret the customer's request. For example, if they ask for "light", "healthy", "low-calorie", "spicy", or "popular" items, infer which menu items match best based on your knowledge of typical dishes, portion sizes, and categories.
    - Respond in a list of items corresponding to the menu items above.
    - When someone says "surprise me", suggest a random selection of 3 to 5 dishes from the menu.
    - When someone writes word "food", consider this to return even drinks/desserts as well.
    - When someone asks for "drinks", suggest chai and other types of drinks as well.
    - Also return a list of indexes of above suggested items.
    - If no items match the customer query, return an empty list [].`;
// - Respond **only** in a list of index numbers corresponding to the menu items.
    // - If no items match the customer query, return an empty array [].
    
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${restroAI}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
        messages: [
        {
          role: "system",
          content: systemContent
        },
        { role: "user", content: userInput },
        ],
    })
  });
  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No response";
}