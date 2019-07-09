/**
 * Adapted from prettier-file-icons npm package
 */

import { extname } from 'path'

const extensions = {
    '': 'unknown',
    audio: 'audio',
    video: 'video',
    text: 'text',
    archive: 'archive',

    '.jpg': 'jpg',
    '.jpe': 'jpg',
    '.jpeg': 'jpg',
    '.jfif': 'jpg',
    '.png': 'png',
    '.gif': 'gif',
    '.tiff': 'tiff',
    '.svg': 'svg',
    '.psd': 'psd',
    '.ai': 'ai',
    '.dwg': 'dwg',

    '.iso': 'iso',
    '.mdf': 'mdf',
    '.nrg': 'nrg',

    '.zip': 'zip',
    '.7z': '7z',
    '.7zip': '7z',
    '.arj': 'arj',
    '.rar': 'rar',
    '.gz': 'archive',
    '.gzip': 'archive',
    '.bz2': 'archive',
    '.bzip2': 'archive',
    '.tar': 'archive',

    '.xls': 'xls',
    '.doc': 'doc',
    '.pdf': 'pdf',
    '.ppt': 'ppt',
    '.rtf': 'rtf',
    '.txt': 'txt',
    '.md': 'text',
    '.markdown': 'text',

    '.avi': 'avi',
    '.mp2': 'mp2',
    '.mp3': 'mp3',
    '.mp4': 'mp4',
    '.fla': 'fla',
    '.mxf': 'mxf',
    '.wav': 'wav',
    '.wma': 'wma',
    '.aac': 'aac',
    '.flac': 'flac',

    '.css': 'css',
    '.csv': 'csv',
    '.html': 'html',
    '.json': 'json',
    '.js': 'js',
    '.xml': 'xml',

    '.dbf': 'dbf',
    '.exe': 'exe'
}

const isString = value => {
    return (
        typeof value === 'string' ||
        Object.prototype.toString.call(value) === '[object String]'
    )
}

export const getIcon = filename => {
    // Extract extension from the filename
    const ext = isString(filename) ? extname(filename).toLowerCase() : ''

    const type = extensions[ext] || extensions['']

    return `https://travel-left-images.s3.us-east-2.amazonaws.com/prettier-file-icons-${type}.jpg`
}
