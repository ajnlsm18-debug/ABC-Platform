import { useState, useEffect } from 'react';

type UserProfile = {
    name: string;
    email: string;
};

// Mock API functions
const fetchUserProfile = async (): Promise<UserProfile> => {
    await new Promise((res) => setTimeout(res, 1000));
    if (Math.random() < 0.2) throw new Error('Failed to fetch user profile');
    return { name: 'Juan Carlos', email: 'juan@example.com' };
};

const updateUserProfile = async (data: Partial<UserProfile>) => {
    await new Promise((res) => setTimeout(res, 1000));
    if (Math.random() < 0.2) throw new Error('Failed to update profile');
    return { ...data };
};

export default function UserProfilePage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [updating, setUpdating] = useState<boolean>(false);
    const [updateMessage, setUpdateMessage] = useState<string | null>(null);

    const loadUser = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchUserProfile();
            setUser(data);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || 'Unknown error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    const handleChange = (field: keyof UserProfile, value: string) => {
        if (!user) return;
        setUser({ ...user, [field]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;
        setUpdating(true);
        setUpdateMessage(null);

        try {
            await updateUserProfile(user);
            setUpdateMessage('Profile updated successfully!');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setUpdateMessage(err.message || 'Update failed');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <p>Loading profile...</p>;
    if (error)
        return (
            <div>
                <p>Error loading profile: {error}</p>
                <button onClick={loadUser}>Retry</button>
            </div>
        );

    return (
        <div style={{ maxWidth: 400, margin: '2rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: 8 }}>
            <h1>User Profile Page</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={user?.name || ''}
                            onChange={(e) => handleChange('name', e.target.value)}
                            disabled={updating}
                            style={{ width: '90%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </label>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={user?.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            disabled={updating}
                            style={{ width: '90%', padding: '0.5rem', marginTop: '0.25rem' }}
                        />
                    </label>
                </div>
                <button type="submit" disabled={updating} style={{ padding: '0.5rem 1rem' }}>
                    {updating ? 'Saving...' : 'Save Changes'}
                </button>
            </form>
            {updateMessage && <p style={{ marginTop: '1rem' }}>{updateMessage}</p>}
        </div>
    );
}
