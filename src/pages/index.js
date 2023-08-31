import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import StartPage from './StartPage'
import axios from 'axios'
import {Provider} from 'react-redux'
import store from '../../store/store'

const inter = Inter({subsets: ['latin']})

export default function Home(props) {
    return (
        <>
                <StartPage data={props}/>
        </>
    )
}

export async function getStaticProps() {
    try { // Fetch initial data using axios or any other data fetching method
        const response = await axios.get('https://opentdb.com/api.php?amount=15');
        const initialData = response.data.results; // Access results property

        return {props: {
                initialData
            }};
    } catch (error) {
        console.error('Error fetching initial data:', error);
        return {
            props: {
                initialData: {}
            }
        };
    }
}
