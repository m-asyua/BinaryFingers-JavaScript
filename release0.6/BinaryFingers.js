
// binary fingers

/*

The following sites were referred:

https://learn.ml5js.org/#/reference/handpose

https://editor.p5js.org/tkyko13/sketches/oPRDIiUb9

https://zenn.dev/tkyko13/scraps/b028812b0b9dc3

*/


let HandPose;
let handResult;

let video;

var digital= "00000";
let f0=0, f1=0, f2=0, f3=0, f4=0;


function setup() {

	createCanvas(windowWidth, windowHeight);

	// console.log(windowWidth+","+ windowHeight);

	video = createCapture(VIDEO, () => {

		HandPose = ml5.handpose(video);

		HandPose.on('predict', result => {
			handResult = result;
		});

	});

	video.hide();

}



function drawLandmarks(landmarks) {

	textSize(20);
//	fill(255, 255, 255);

	for (var i = 0; i < landmarks.length; i++) {

		if( i % 4 == 0  && i != 0){
			fill(255,   0, 0);
		}else{
			fill(0, 0, 0);
		}

		text(i, landmarks[i][0], landmarks[i][1]);

	}

}

function drawNumber(landmarks) {

	textSize(20);
//	fill(255, 255, 255);

	for (var i = 0; i < landmarks.length; i++) {

		if( i % 4 == 0  && i != 0){
			fill(255,   0, 0);
			let n = i / 4 -1;
			let bit = Math.pow(2,n);
			text(bit, landmarks[i][0], landmarks[i][1]);
		}

	}

}



function draw() {

	if(video) {
		image(video, 0, 0);
	}

	if(handResult && handResult[0]) {

		//drawLandmarks(handResult[0].landmarks);
		drawNumber(handResult[0].landmarks);

		let number_of_fingers = getFingerInfo(handResult[0]);

		text("the number of fingers:" + number_of_fingers, 50, 20);

		Digital = ""+String(f4) +String(f3) +String(f2) +String(f1) +String(f0); 
		Decimal = parseInt(Number(Digital), 2);

		text(" 2   :" + Digital, 150, 40);
		text("10   :" + Decimal, 150, 60);

	}


}






function getFingerInfo(hand) {

	f0 = 0;
	f1 = 0;
	f2 = 0;
	f3 = 0;
	f4 = 0;


	// for only right thumb.  use thumb[][0]=x
	if (       hand.annotations.thumb[3][0] > hand.annotations.thumb[2][0])
		f0 = 1;

//  use thumb[][1]=y
//	if (       hand.annotations.thumb[3][1] < hand.annotations.thumb[2][1] )
//		f0 = 1;
//


	if ( hand.annotations.indexFinger[3][1] < hand.annotations.indexFinger[2][1] )
		f1 = 1;

	if (hand.annotations.middleFinger[3][1] < hand.annotations.middleFinger[2][1] )
		f2 = 1;

	if (  hand.annotations.ringFinger[3][1] < hand.annotations.ringFinger[2][1] )
		f3 = 1;

	if (       hand.annotations.pinky[3][1] < hand.annotations.pinky[2][1] )
		f4 = 1;


	return f0+f1+f2+f3+f4;


}




