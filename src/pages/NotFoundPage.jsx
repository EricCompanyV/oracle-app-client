import { Image } from "@mantine/core"


function NotFoundPage() {
    return ( 
        <div style={{ width: 480, marginLeft: 'auto', marginRight: 'auto' }}>
        <Image
            radius={"md"}
            src="https://i.imgflip.com/6l8z5d.jpg" 
            alt="404 Error"
        /> </div>
     )
}

export default NotFoundPage;