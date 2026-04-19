import Three from "./core/Three";
import "./style.css";

document.addEventListener("DOMContentLoaded", async () => {
	const container = document.querySelector("#app");
	const three = new Three(container);
	
	const preloaderBlack = document.getElementById("preloaderBlack");
	const line = document.getElementById("line");
	const preloaderEnterButton = document.getElementById("preloaderEnterButton");

	// Animate entry lines
	if (window.gsap && line) {
		window.gsap.fromTo(line, { width: 0 }, {
			width: '100%',
			duration: 1.25,
			delay: 1,
			ease: 'power2.out'
		});
	}

	await three.run();
	await three.scene.ready;
	document.body.classList.remove("loading");

	// Show enter button
	if (window.gsap && preloaderEnterButton) {
		window.gsap.delayedCall(5.25, () => {
			preloaderEnterButton.classList.add('is-active');
		});
	}

	if (preloaderEnterButton && preloaderBlack) {
		preloaderEnterButton.addEventListener("click", () => {
			// Fade out overlay
			window.gsap.to(preloaderBlack, {
				opacity: 0,
				duration: 0.25,
				onComplete: () => preloaderBlack.style.display = "none"
			});

			// Trigger sound - Cinematic deep bass hit
			try {
				const ctx = new (window.AudioContext || window.webkitAudioContext)();
				const osc = ctx.createOscillator();
				const gainNode = ctx.createGain();
				
				osc.type = "sine";
				osc.frequency.setValueAtTime(150, ctx.currentTime);
				osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 2.0);
				
				gainNode.gain.setValueAtTime(0.8, ctx.currentTime);
				gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 2.0);
				
				osc.connect(gainNode);
				gainNode.connect(ctx.destination);
				
				osc.start();
				osc.stop(ctx.currentTime + 2.0);
			} catch (e) {
				console.log("Audio trigger failed", e);
			}
		});
	}
});
