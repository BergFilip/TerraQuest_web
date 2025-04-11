import "../styles/components/header.scss"


const Logo  = () => {
    return (
        <div className="logo">
            <a href="/">
                <img src="src/assets/terraquest.webp" alt="Logo TerraQuest"/>
                <div className="f_up_text_logo">TerraQuest</div>
            </a>
        </div>
    );
};

export default Logo;