import { Flex, Layout } from 'antd';
import { useCallback, useEffect, useRef, useState } from 'react';
import { handler } from '../../util/vscode';
import FileItems from './components/FileItems';
import Sidebar from './components/Sidebar';
import Toolbar from './components/Toolbar';
import { CompressInfo, FileInfo } from './zipTypes';

const { Sider, Content } = Layout;
export default function Zip() {
    const [currentDir, setCurrentDir] = useState('')
    const [size, setSize] = useState('')
    const [extension, setExtension] = useState('')
    const [tableItems, setTableItems] = useState([] as FileInfo[])
    const [info, setInfo] = useState({ files: [] } as CompressInfo)
    const infoRef = useRef(info)
    infoRef.current = info

    const changeFiles = useCallback((dirPath: string) => {
        const current = infoRef.current
        setCurrentDir(dirPath)
        setTableItems(dirPath ? [
            {
                name: '..',
                isDirectory: true,
                entryName: dirPath.includes('/') ? dirPath.replace(/\/[^\/]+$/, '') : null,
            },
            ...current.folderMap[dirPath].children
        ] : current.files)
    }, [])

    useEffect(() => {
        handler
            .on('size', (size: string) => {
                setSize(size)
            })
            .on('extension', (ext: string) => {
                setExtension(ext)
            })
            .on('data', (newInfo: CompressInfo) => {
                setInfo(newInfo)
                setTableItems(newInfo.files)
            })
            .on('openDir', changeFiles)
            .on('zipChange', () => handler.emit('init'))
            .emit('init')
    }, [changeFiles])
    return (
        <Flex gap="middle" wrap="wrap">
            <Layout >
                <Toolbar currentDir={currentDir} size={size} extension={extension} />
                <Layout style={{ backgroundColor: 'white' }}>
                    <Sider width="25%" style={{ backgroundColor: 'transparent' }}>
                        <Sidebar name={info.fileName} items={info.files} currentDir={currentDir} OnClickFolder={changeFiles} />
                    </Sider>
                    <Content > <FileItems items={tableItems} /> </Content>
                </Layout>
            </Layout>
        </Flex>
    )
}