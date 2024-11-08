export async function fetchChats(page: number = 0): Promise<any> {
  try {
    const response = await fetch(`https://qa.corider.in/assignment/chat?page=${page}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching chats:', error);
    throw error;
  }
}