import { Link } from "react-router-dom";
function Contact({ avatar, name }) {
	return (
		<div className="w-full flex p-2 mb-2 rounded-lg hover:bg-hover">
            <Link to={'/'} className={'flex'} >
                <img className="h-[28px] w-[28px] rounded-full mr-3" src={avatar} alt="" />
    			<span className=" block flex-1 h-full font-semibold items-center line-clamp-2 text-ellipsis ">
    				{name}
    			</span>
            </Link>
		</div>
	);
}

export default Contact;
