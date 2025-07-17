import { Link } from "react-router";

function AppHeader() {
    return (
        <header className="fixed z-10 w-full bg-[#121212] flex items-center justify-center">
            <div className="w-full max-w-[1328px] flex items-center justify-between px-6 py-2">
                {/* 로고 & 네비게이션 영역 */}
                <div className="flex items-center gap-4">
                    {/* 로고 이미지 영역 */}
                    <img src="/assets/icons/logo-sm.svg" alt="" className="h-9 w-9" />
                    {/* 네비게이션 영역 */}
                    <div className="flex items-center gap-6">
                        <Link to={"/"}>About Me</Link>
                        <Link to={"/topics"}>토픽 인사이트</Link>
                    </div>
                </div>
                {/* 로그인 & 우리가 하는 일 영역 */}
                <Link to={"/sign-in"} className="text-neutral-500 hover:text-white transition-all duration-300">
                    로그인
                </Link>
            </div>
        </header>
    );
}

export { AppHeader };
