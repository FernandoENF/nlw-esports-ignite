import './styles/main.css'
import logoImg from './assets/logo-nlw-esports.svg'
import {GameController, MagnifyingGlassPlus} from 'phosphor-react'
import {GameBanner} from "./components/GameBanner";
import {CreateAdBanner} from "./components/CreateAdBanner";
import {useEffect, useState} from "react";
import * as DialogPrimitive from '@radix-ui/react-dialog';
import * as Dialog from "@radix-ui/react-dialog";
import {Input} from "./components/Input";
import {CreateAdModal} from "./components/CreateAdModal";
import axios from "axios";


interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
        ads: number;
    }
}

function App() {
    const [games, setGames] = useState<Game[]>([])

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => setGames(response.data))
    }, [])

    return (
        <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
            <img src={logoImg}/>
            <h1 className="text-white font-black text-6xl mt-20">
                Seu <span className="bg-nlw-gradient text-transparent bg-clip-text">duo</span> está aqui.
            </h1>

            <div className="grid grid-cols-6 gap-6 mt-16">
                {games.map(game => {
                    return (
                        <GameBanner
                            key={game.id}
                            bannerUrl={game.bannerUrl}
                            title={game.title}
                            adsCount={game._count.ads}/>
                    )
                })}
            </div>

            <Dialog.Root>
                <CreateAdBanner/>
                <CreateAdModal/>
            </Dialog.Root>
        </div>
    )
}

export default App
