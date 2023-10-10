/**
 * Extension function for jQuery. May be used instead of the standard
 * $('#button').on('click') function to show ripple effect on the clicked
 * element. Provides single click listener: that means it disables all the
 * previously set click listener before setting its own.
 * 
 * Note: The target element should have position: relative property for the
 * correct behavior.
 * 
 * @param {*} callback Callback called on element click. It's called after attaching
 *                      and running ripple animation.
 * @returns jQuery object.
 */
$.fn.clickWithRipple = function(callback) {
    return this.off('click').on('click', (e) => {
        const clickableTarget = $(this);
        const ripple = $("<span class='ripple'></span>");
        const rect = clickableTarget[0].getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.css({
            width: `${size}px`,
            height: `${size}px`,
            left: `${x}px`,
            top: `${y}px`
        });

        clickableTarget.append(ripple);

        ripple.transition(
            { opacity: 0, scale: 4},
            600,
            'linear',
            () => ripple.remove()
        );

        if (callback != null) {
            callback();
        }
    });
}