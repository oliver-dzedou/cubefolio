document.addEventListener("DOMContentLoaded", function() {
    const cube = document.getElementById("cube");
    if (!cube) return; // Exit if the cube element is not on the page

    let isDragging = false;
    let startX, startY;
    let currentRotateX = 0, currentRotateY = 0;
    let velocityX = 0, velocityY = 0;
    let lastX, lastY;
    let speed = 0.09;

    // Update the cube's transform based on rotation values
    function updateCubeTransform() {
        cube.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;
    }

    // Inertia: gradually decelerate the rotation after dragging
    function applyInertia() {
        velocityX *= 0.95;
        velocityY *= 0.95;

        currentRotateX -= velocityY;
        currentRotateY += velocityX;

        updateCubeTransform();

        if (Math.abs(velocityX) > 0.1 || Math.abs(velocityY) > 0.1) {
            requestAnimationFrame(applyInertia);
        }
    }

    cube.parentElement.addEventListener("mousedown", function(e) {
        if (e.button !== 0) return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        lastX = startX;
        lastY = startY;
    });


    document.addEventListener("mousemove", function(e) {
        if (!isDragging || (e.buttons !== 1)) return;
        const deltaX = e.clientX - lastX;
        const deltaY = e.clientY - lastY;
        currentRotateY += deltaX * speed;
        currentRotateX -= deltaY * speed;
        updateCubeTransform();
        velocityX = deltaX * speed;
        lastX = e.clientX;
        lastY = e.clientY;
    });


    document.addEventListener("mouseup", function() {
        if (isDragging) {
            isDragging = false;
            requestAnimationFrame(applyInertia);
        }
    });

    // --- Touch Events ---
    cube.parentElement.addEventListener("touchstart", function(e) {
        isDragging = true;
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        lastX = startX;
        lastY = startY;
    }, { passive: true });

    cube.parentElement.addEventListener("touchmove", function(e) {
        if (!isDragging) return;
        const touch = e.touches[0];
        const deltaX = touch.clientX - lastX;
        const deltaY = touch.clientY - lastY;
        currentRotateY += deltaX * speed;
        currentRotateX -= deltaY * speed;
        updateCubeTransform();
        velocityX = deltaX * speed;
        velocityY = deltaY * speed;
        lastX = touch.clientX;
        lastY = touch.clientY;
    }, { passive: true });

    cube.parentElement.addEventListener("touchend", function() {
        if (isDragging) {
            isDragging = false;
            requestAnimationFrame(applyInertia);
        }
    });
});

