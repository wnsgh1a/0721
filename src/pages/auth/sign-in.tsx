import { AppFooter, AppHeader } from "@/components/common";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Input, Label } from "@/components/ui";

function SignIn() {
    return (
        <div className="page">
            <AppHeader />
            <div className="container">
                <div className="w-full h-full flex flex-col items-center p-4 gap-4 sm:p-6 sm:gap-6">
                    <div className="flex flex-col items-center gap-4">
                        <p className="text-base">안녕하세요 👋🏻</p>
                        <div className="flex flex-col items-center">
                            <div className="flex items-center gap-[2px]">
                                <p className="text-base text-[#f96859]">개발자 9Diin의 포트폴리오</p>
                                <p className="text-neutral-500">에 방문해주셔서 감사합니다.</p>
                            </div>
                            <p className="text-neutral-500">서비스를 이용하려면 로그인을 진행해주세요.</p>
                        </div>
                    </div>
                    <Card className="w-full border-0 bg-transparent sm:border sm:bg-card sm:max-w-sm">
                        <CardHeader className="p-0 sm:px-6">
                            <CardTitle className="text-lg">로그인</CardTitle>
                            <CardDescription>로그인을 위한 정보를 입력하세요.</CardDescription>
                        </CardHeader>
                        <CardContent className="p-0 sm:px-6">
                            <form>
                                <div className="flex flex-col gap-6">
                                    <div className="grid gap-2">
                                        <Label htmlFor="email">이메일</Label>
                                        <Input id="email" type="email" placeholder="이메일을 입력하세요." required />
                                    </div>
                                    <div className="grid gap-2">
                                        <div className="flex items-center">
                                            <Label htmlFor="password">비밀번호</Label>
                                            <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                                                비밀번호를 잊으셨나요?
                                            </a>
                                        </div>
                                        <Input id="password" type="password" placeholder="비밀번호를 입력하세요." required />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 px-0 sm:px-6">
                            <Button type="submit" variant={"destructive"} className="w-full">
                                로그인
                            </Button>
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}

export default SignIn;
