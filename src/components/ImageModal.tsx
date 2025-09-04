"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ImageModalProps {
	isOpen: boolean;
	onClose: () => void;
	imageUrl: string;
	imageTitle?: string;
}

export function ImageModal({ isOpen, onClose, imageUrl, imageTitle }: ImageModalProps) {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center">
			<div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
			<div className="relative z-10 max-w-[90vw] max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden">
				<Button
					mode="icon"
					size="icon"
					onClick={onClose}
					className="absolute top-2 right-2 z-20 bg-white/80 hover:bg-white rounded-full shadow-lg size-10"
				>
					<X className="h-5 w-5" />
				</Button>

				{imageTitle && (
					<div className="absolute top-2 left-2 z-20 bg-white/80 px-3 py-1 rounded-full shadow-lg">
						<p className="text-sm font-medium text-gray-800">{imageTitle}</p>
					</div>
				)}

				<div className="relative">
					<img
						src={imageUrl}
						alt={imageTitle || "放大图片"}
						className="max-w-full max-h-[90vh] object-contain"
						onClick={(e) => e.stopPropagation()}
					/>
				</div>
			</div>
		</div>
	);
}
