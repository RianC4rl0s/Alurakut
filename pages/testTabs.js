import React from 'react'
import Tabs from '../src/components/tabs/Tabs'



export default function home(){

    return (
        <>
            <Tabs >
                <div label='Tab 1'>
                    <h3>
                        tab1
                    </h3>
                    <p>
                        loren ipson
                    </p>
                </div>
                <div label='Tab 2'>
                    <h3>
                        tab2
                    </h3>
                    <p>
                        Hello world!!
                    </p>
                </div>
                <div label='Tab 3'>
                    <h3>
                        tab2
                    </h3>
                    <p>
                        Test
                    </p>
                </div>
            </Tabs>
        </>
    )
}

