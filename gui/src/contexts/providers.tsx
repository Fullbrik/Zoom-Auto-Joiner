import React, { ReactElement } from 'react'
import ConfigFileProvider from './config-file'
import RecentFilesProvider from './recent-files'

interface Props {
    children: any
}

export default function Providers({children}: Props): ReactElement {
    return (
        <RecentFilesProvider>
            <ConfigFileProvider>
                {children}
            </ConfigFileProvider>
        </RecentFilesProvider>
    )
}
