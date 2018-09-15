Vue.component("carousel-video", {
  template: `  <div class="container" style="background: black; padding-top: 30px; padding-bottom: 30px">
    <div class="center">
        <div class="embed-responsive embed-responsive-16by9">
            <video width="320" height="240" autoplay loop muted>
                <source src="/video/Queens of the Stone Age - If I Had A Tail.mp4" type="video/mp4">
            </video>
        </div>
    </div>
</div>
`
});
