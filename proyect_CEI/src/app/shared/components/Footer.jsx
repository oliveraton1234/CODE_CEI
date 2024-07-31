

const Footer = () => {
    return (
        <footer className=" bg-black-cei flex justify-center mt-12">
            <div className="w-4/6 flex">
                <div className="w-2/4">
                    <p className="text-white text-xl leading-loose mt-12">Oaxaca Youth Empowerment</p>
                    <p className="text-white text-xl leading-loose mt-12">P.O. Box 2219</p>
                    <p className="text-white text-xl leading-loose">Benton, AR 72018</p>
                    <p className="text-xl leading-loose mt-12 mb-20"><a href="mailto:centrodeesperanzainfantil@gmail.com" className="text-orange-cei ">centrodeesperanzainfantil@gmail.com</a></p>
                </div>
                <div className="w-2/4">
                    <p className="text-white text-xl leading-loose mt-12 ml-96">Follow</p>
                    <div className="ml-96">
                        <a href="https://www.facebook.com/oaxacayouthempowerment" className="text-orange-cei text-xl leading-loose mt-6 mr-5 block">Facebook</a>
                        <a href="https://www.instagram.com/oaxacayouthempowerment/" className="text-orange-cei text-xl leading-loose  block">Instagram</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
