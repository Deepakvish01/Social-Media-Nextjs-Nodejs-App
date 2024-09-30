"use client"
import { useContext, useEffect } from "react";
import { AuthContext } from "./Context/AuthContext";
import { checkAuthHandler } from "@/Utils/constants";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter();
	const { AuthData } = useContext(AuthContext);
	useEffect(() => {
		checkAuthHandler(AuthData, router);
	}, [])
	if (AuthData) {
		router.push("/Posts")
	}
	return (
		<div></div>
	)
}
