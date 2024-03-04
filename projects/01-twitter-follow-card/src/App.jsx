import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx';

const users = [
    {
        userName: 'hitboxking',
        name: 'HitboxKing',
        isFollowing: true
    },
    {
        userName: 'vegetta777',
        name: 'Vegetta777',
        isFollowing: false
    },
    {
        userName: 'dedreviil',
        name: 'Elded',
        isFollowing: false
    },
    {
        userName: 'Roiereal',
        name: 'Roier',
        isFollowing: false
    },
    {
        userName: 'elonmusk',
        name: 'Elon Musk',
        isFollowing: true
    }
]

export function App() {
    return (
        <section className='App'>  
            {
                users.map(user=> {
                    const {userName, name, isFollowing} = user
                    return (
                        <TwitterFollowCard key={userName} userName={userName} initialIsFollowing={isFollowing}>
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
    );
}