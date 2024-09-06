import Nav from '@components/Nav'
import Provider from '@components/Provider'
import '@styles/globals.css'


export const matadate = {
    title: 'prompt',
    description: 'discover and share prompts'
}
const Rootlayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default Rootlayout
