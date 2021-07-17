import React, { useEffect } from 'react'
import { useState } from 'react'
import styles from '../tabs/Tabs.module.css'

import { slugify } from '../../utils/slugify'

import { useRouter } from 'next/router'

const Tab = (propierties) => {
    const children = propierties.children
    const initialTab = propierties.initialTab
    const [activeTab, setActiveTab] = useState(children[0].props.label)
    const router = useRouter();


    const handleClick = (e, newActiveTab) => {
        e.preventDefault()
        setActiveTab(newActiveTab)
    }
   
    //mudar a url do codigo
    useEffect(() => {

        //router.push(slugify(activeTab),undefined,{shallow:true})
        router.push(`${router.pathname}?tab=${slugify(activeTab)}`,undefined,{shallow:true})
    }, [activeTab])
    return (<>

        <div>
            <ul className={styles.tabs}>
                {children.map((tab) => {
                    const label = tab.props.label
                    return (<li
                        key={label}
                        className={label == activeTab ? styles.current : ""}
                    >
                        <a
                            href='#'
                            onClick={e => handleClick(e, label)
                            }>
                            {label}
                        </a>
                    </li>
                    )
                }
                )}

            </ul>
            {
                children.map((e) => {
                    if (e.props.label == activeTab) {
                        return (
                            <div key={e.props.label} className={styles.content}>
                                {e.props.children}
                            </div>
                        )
                    }



                })
            }
        </div>


    </>
    )
}

export default Tab