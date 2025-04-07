export default function handler(req: any, res: any) {
    if (req.method === 'GET') {
        const mockPosts = [
            { id: 1, title: 'Mock Post 1', body: 'This is a mock post' },
            { id: 2, title: 'Mock Post 2', body: 'This is another mock post' },
        ];
        res.status(200).json(mockPosts);
    } else if (req.method === 'POST') {
        // 处理POST请求的逻辑
        res.status(200).json({ message: 'POST request received' });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}