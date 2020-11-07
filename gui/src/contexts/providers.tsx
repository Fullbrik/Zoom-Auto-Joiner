import React, { ReactElement } from 'react'
import RecentFilesProvider from './recent-files'

interface Props {
    children: any
}

export default function Providers({children}: Props): ReactElement {
    return (
        <RecentFilesProvider>
            {children}
        </RecentFilesProvider>
    )
}
