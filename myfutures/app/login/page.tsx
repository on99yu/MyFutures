"use client";
import { useState } from "react";

const LoginPage: React.FC = () => {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "signup") {
      try {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: {  "Content-Type": "application/json" },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        });
        const data = await res.json();
        // const text = await res.text();
        // console.log("응답 본문:", text);
        if (res.ok) {
          alert("회원가입이 완료되었습니다.");
          setMode("signin");
          setForm({ name: "", email: "", password: "" });
        } else {
          alert(data.error || "회원가입 실패");
        }
      } catch (error) {
        console.error("회원가입 오류:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      }
    } else {
      console.log("로그인 데이터", form);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 p-16">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {mode === "signin" ? "로그인" : "회원가입"}
        </h2>

        {/* 로그인, 회원가입 폼 스위칭 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                이름
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="이름을 입력하세요"
                value={form.name}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="이메일을 입력하세요"
              value={form.email}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
          >
            {mode === "signin" ? "로그인" : "회원가입"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
        >
          {mode === "signin" ? "계정 만들기" : "이미 계정이 있으신가요?"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
