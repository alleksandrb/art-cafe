
        const NextPictureSecond = 10;
        let storage = [];
        let IdStorage = 0;
        const process = document.querySelector(".process")
        const colors = document.querySelector(".colors")
        const back = document.querySelector(".back")
        const cs = document.querySelector("#rishon")
        const canvas = cs.getContext("2d")
        const dancePool = document.querySelector(".dance_pool")
        const coors = {
            "x": () => rIr(-cs.offsetWidth, cs.offsetWidth * 2),
            "y": () => rIr(-cs.offsetHeight, cs.offsetHeight * 2),
        }
        let sIId;

        back.onclick = () => {
            let id = cs.getAttribute('id') - 1
            if (id < 0) return 'end'

            canvas.clearRect(0, 0, cs.offsetWidth, cs.offsetHeight)
            canvas.beginPath()
            canvas.rect(0, 0, cs.offsetWidth, cs.offsetHeight);
            canvas.fillStyle = storage[id]["back_ground"]
            canvas.fill()
            cs.setAttribute('id', id)

            canvas.moveTo(storage[id].start_coors[0], storage[id].start_coors[1]);
            storage[id].circle_coors.x.forEach((x, index) => {
                let y = storage[id].circle_coors.y[index]
                let radius = storage[id].circle_coors.radius[index]
                let radians = storage[id].circle_coors.radians[index]
                canvas.arc(x, y, radius, radians[0], radians[1])
            })
            storage[id].line_coors.y.forEach((y, index) => {
                let x = storage[id].line_coors.x[index]
                if (storage[id].sub_line_count[index]) {
                    canvas.fillStyle = storage[id].sub_line_count[index]
                    canvas.fill()
                }
                canvas.lineTo(x, y)
            })
            canvas.strokeStyle = storage[id].stroke_style
            canvas.fillStyle = storage[id].fill_style
            canvas.fill()
            canvas.closePath()
            canvas.stroke()
        }

        colors.onclick = () => {
            let id = cs.getAttribute('id')
            canvas.clearRect(0, 0, cs.offsetWidth, cs.offsetHeight)
            canvas.beginPath()
            canvas.rect(0, 0, cs.offsetWidth, cs.offsetHeight);

            let backGround = `rgba(${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)}, 0.${rIr(6, 9)})`
            canvas.fillStyle = backGround
            storage[id]["back_ground"] = backGround

            canvas.fill()
            canvas.moveTo(storage[id].start_coors[0], storage[id].start_coors[1]);
            storage[id].circle_coors.x.forEach((x, index) => {
                let y = storage[id].circle_coors.y[index]
                let radius = storage[id].circle_coors.radius[index]
                let radians = storage[id].circle_coors.radians[index]
                canvas.arc(x, y, radius, radians[0], radians[1])
            })
            storage[id].line_coors.y.forEach((y, index) => {
                let x = storage[id].line_coors.x[index]
                canvas.lineTo(x, y)

                if (+index === +rIr(0, storage[id].line_coors.y.length)) {
                    let subColor = `rgba(${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)}, 0.${rIr(6, 9)})`
                    canvas.fillStyle = subColor
                    storage[id].sub_line_count[index] = subColor
                    canvas.fill()
                }
            })

            let strokeStyle = `rgba(${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)}, 0.${rIr(7, 9)})`
            canvas.strokeStyle = strokeStyle
            storage[id]["stroke_style"] = strokeStyle

            let fillStyle = `rgba(${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)}, 0.${rIr(6, 9)})`
            canvas.fillStyle = fillStyle
            storage[id]["fill_style"] = fillStyle

            canvas.fill()
            canvas.closePath()
            canvas.stroke()
        }

        cs.onclick = () => artist(cs, canvas, coors)

        process.onclick = () => {
            if (process.textContent === 'Stop') {
                process.textContent = 'Process'
                clearInterval(sIId)
                return 'stop'
            }
            if (process.textContent === 'Process') {
                process.textContent = 'Stop'
                artist(cs, canvas, coors)
                sIId = setInterval(() => artist(cs, canvas, coors), NextPictureSecond + '000')
            }
        }

        function rIr(min, max) {
            //random integer
            let random = min - 0.5 + Math.random() * (max - min + 1)
            random = Math.round(random)
            return random
        }

        function rIrSqrtEight(min, max) {
            let randomNumber = self.crypto.getRandomValues(new Uint8Array(1))[0]
            if (randomNumber === 256) return 0;
            if (randomNumber >= min && randomNumber <= max) {
                return randomNumber
            }
            rIrSqrtEight(min, max)
        }

        function getRadians() {
            return (Math.PI / 180) * rIr(-360, 360)
        }

        function artist(cs, canvas, coors) {
            cs.setAttribute('id', IdStorage)

            storage[IdStorage] = {
                "circle_coors": {
                    "x": [], "y": [], "radius": [], "radians": []
                },
                "line_coors": {
                    "x": [], "y": []
                },
                "sub_line_count": [],
                "start_coors": [],
                "stroke_style": "",
                "fill_style": "",
                "back_ground": "",
            };

            let lineCount = rIr(rIr(1, 10), rIr(11, 101))
            let circleCount = rIr(rIr(1, 10), rIr(11, 101))
            let backGround = `rgba(${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)}, 0.${rIr(7, 9)})`
            let startX = coors.x()
            let startY = coors.y()
            let x, y, radius, radians

            canvas.clearRect(0, 0, cs.offsetWidth, cs.offsetHeight)
            canvas.beginPath()
            canvas.rect(0, 0, cs.offsetWidth, cs.offsetHeight)
            storage[IdStorage]["back_ground"] = backGround
            canvas.fillStyle = backGround
            canvas.fill()

            storage[IdStorage]["start_coors"][0] = startX
            storage[IdStorage]["start_coors"][1] = startY
            canvas.moveTo(startX, startY)

            for (let k = 0; k <= circleCount; k++) {
                x = coors.x()
                y = coors.y()
                radius = rIr(10, 100)
                radians = [getRadians(), getRadians()]
                canvas.arc(x, y, radius, radians[0], radians[1])
                storage[IdStorage]["circle_coors"]["x"].push(x)
                storage[IdStorage]["circle_coors"]["y"].push(y)
                storage[IdStorage]["circle_coors"]["radius"].push(radius)
                storage[IdStorage]["circle_coors"]["radians"].push(radians)
            }

            let subLineCount = []
            for (let j = 0; j <= rIr(0, lineCount); j++) {
                subLineCount.push(rIr(0, lineCount))
            }

            for (let i = 0; i <= lineCount; i++) {
                x = coors.x()
                y = coors.y()
                canvas.lineTo(x, y)
                if (subLineCount.includes(i)) {
                    let subColor = `rgba(${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)}, 0.${rIr(1, 9)})`
                    canvas.fillStyle = subColor
                    canvas.fill()
                    storage[IdStorage].sub_line_count[i] = subColor
                }
                storage[IdStorage]["line_coors"]["x"].push(x)
                storage[IdStorage]["line_coors"]["y"].push(y)
            };

            let strokeStyle = `rgba(${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)}, 0.${rIr(1, 9)})`
            canvas.strokeStyle = strokeStyle
            storage[IdStorage]["stroke_style"] = strokeStyle

            let fillStyle = `rgba(${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)},${rIrSqrtEight(0, 255)}, 0.${rIr(1, 9)})`
            canvas.fillStyle = fillStyle
            storage[IdStorage]["fill_style"] = fillStyle

            canvas.fill()
            canvas.closePath()
            canvas.stroke()

            IdStorage++
        }

