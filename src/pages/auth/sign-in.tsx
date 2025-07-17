import { useState } from "react";
import { Link } from "react-router";
import supabase from "@/lib/supabase";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { AppFooter, AppHeader } from "@/components/common";
import { Button, Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Label } from "@/components/ui";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
    email: z.email("올바른 이메일을 입력해주세요."),
    password: z.string().min(8, {
        message: "비밀번호는 최소 8자 이상이어야 합니다.",
    }),
});

function SignIn() {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const handleToggle = () => setShowPassword((prev) => !prev);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Supabase를 활용한 로그인 기능 구현
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });
    };

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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3">
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>이메일</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="이메일을 입력하세요." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem className="relative">
                                                <div className="w-full flex items-center justify-between">
                                                    <FormLabel>비밀번호</FormLabel>
                                                    <Link to={"/sign-in/credentials"} className="text-sm underline">
                                                        비밀번호를 잊으셨나요?
                                                    </Link>
                                                </div>
                                                <FormControl>
                                                    <Input type={showPassword ? "text" : "password"} placeholder="비밀번호를 입력하세요." {...field} />
                                                </FormControl>
                                                <Button type="button" size={"icon"} className="absolute top-7 right-1 bg-transparent hover:bg-transparent" onClick={handleToggle}>
                                                    {showPassword ? <Eye className="text-muted-foreground" /> : <EyeOff className="text-muted-foreground" />}
                                                </Button>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <Button type="submit" variant={"destructive"} className="w-full mt-3 -mb-4">
                                        로그인
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                        <CardFooter className="flex-col gap-2 px-0 sm:px-6">
                            <Button variant="outline" className="w-full">
                                Login with Google
                            </Button>
                            <div className="text-sm text-center">
                                계정이 없으신가요?
                                <Link to={"/sign-up"} className="underline ml-1">
                                    회원가입
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <AppFooter />
        </div>
    );
}

export default SignIn;
