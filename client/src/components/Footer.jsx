import logo from '../../images/logo.png';

const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-between w-full p-4 md:justify-cetner gradient-bg-footer">
            <div className="flex flex-col items-center w-full my-4 sm:flex-row jsutfy-between">
                <div className="flex flex-[0.5] justify-center items-center text-white geo-font">
                    <img src={logo} alt="wall.eth" className="w-8 h-8" />all.eth
                </div>
                <div className="flex flex-wrap items-center flex-1 w-full mt-5 justify-evenly sm:mt-0">
                    <p className="mx-2 text-base text-center text-white cursor-pointer">Market</p>
                    <p className="mx-2 text-base text-center text-white cursor-pointer">Exchange</p>
                    <p className="mx-2 text-base text-center text-white cursor-pointer">Tutorials</p>
                    <p className="mx-2 text-base text-center text-white cursor-pointer">Wallets</p>
                </div>
            </div>
            <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-4" />
            <div className="sm:w-[90%] w-full flex justify-between items-center mt-2">
            <p className="text-sm text-white text-pointer">
                    The contents of this website are deployed from this&nbsp;
                    <a
                        href="https://github.com/SBagaria2710/wall.eth"
                        target="_blank"
                        rel="noopener noreferral"
                        className="underline"
                    >open sources repository</a>
                </p>
                <p className="mt-4 text-sm text-white text-pointer">
                    Built by&nbsp;
                    <a
                        href="https://linktr.ee/ShashwatB"
                        target="_blank"
                        rel="noopener noreferral"
                        className="underline"
                    >Shashwat Bagaria</a>
                </p>
            </div>
        </div>
    );
};

export default Footer;
