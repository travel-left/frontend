import 'antd/es/message/style/css'
import { message } from 'antd'

export default (type, text) => {
    let msg
    switch (type) {
        case 'success':
            msg = message.success(text)
            break

        case 'error':
            msg = message.error(text)
            break

        default:
            msg = message.success('Thanks for submmitting.')
            break;
    }

    return msg
}