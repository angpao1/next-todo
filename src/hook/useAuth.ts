import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useAuth = () => {
    const [userId, setUserId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            setUserId(user.id);
            router.push('/todo');
        } else {
            router.push('/signin');
        }
    }, [router]);

    return userId;
};
