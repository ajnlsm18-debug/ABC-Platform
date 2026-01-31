import { useState, useEffect } from 'react';

type User = {
    id: number;
    name: string;
    email: string;
};

// Generate 100 mock users
const mockUsers: User[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`
}));

// Mock API to fetch users with pagination
const fetchUsers = async (page: number, perPage: number): Promise<{ users: User[]; total: number }> => {
    await new Promise((res) => setTimeout(res, 500)); // simulate network delay
    if (Math.random() < 0.1) throw new Error('Failed to fetch users'); // simulate error

    const start = (page - 1) * perPage;
    const end = start + perPage;
    return { users: mockUsers.slice(start, end), total: mockUsers.length };
};

export default function UsersPage() {
    const perPage = 10;
    const [users, setUsers] = useState<User[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const loadUsers = async (page: number) => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUsers(page, perPage);
            setUsers(data.users);
            setTotal(data.total);
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers(page);
    }, [page]);

    const totalPages = Math.ceil(total / perPage);

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
            <h1>Users List</h1>

            {loading && <p>Loading users...</p>}
            {error && (
                <div>
                    <p>Error: {error}</p>
                    <button onClick={() => loadUsers(page)}>Retry</button>
                </div>
            )}

            {!loading && !error && (
                <>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>ID</th>
                                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
                                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (
                                <tr key={u.id}>
                                    <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.id}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.name}</td>
                                    <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>{u.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
                        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
                            Previous
                        </button>
                        <span>
                            Page {page} of {totalPages}
                        </span>
                        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
