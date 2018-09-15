Vue.component('carousel', {
    template: `
    <div class="container">
    <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="2000">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img class="d-block w-100" src="image/king-gizzard.jpg" alt="First slide" height="600px">
                <div class="carousel-caption d-none d-md-block">
                    <h1>
                        <strong>King Gizzard & The Lizard Wizard</strong>
                    </h1>
                    <p>Modern Australian Psychedlic Rock</p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="image/pink-floyd.jpg" alt="Second slide" height="600px;">
                <div class="carousel-caption d-none d-md-block">
                    <h1>
                        <strong>Pink Floyd</strong>
                    </h1>
                    <p>Legendary Psychedlic Rock from London</p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="image/tame-impala.jpg" alt="Third slide" height="600px;">
                <div class="carousel-caption d-none d-md-block">
                    <h1>
                        <strong>Tame Impala</strong>
                    </h1>
                    <p>Modern Psychedlic Rock</p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="image/om-band.jpg" alt="Fourth slide" height="600px">
                <div class="carousel-caption d-none d-md-block">
                    <h1>
                        <strong>OM</strong>
                    </h1>
                    <p>Spiritual Stoner Rock</p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="image/sleep.jpg" alt="Fifth slide" height="600px">
                <div class="carousel-caption d-none d-md-block">
                    <h1>
                        <strong>Sleep</strong>
                    </h1>
                    <p>Legendary Stoner Rock from San Jose</p>
                </div>
            </div>
            <div class="carousel-item">
                <img class="d-block w-100" src="image/electric-wizard.jpg" alt="Sixth slide" height="600px">
                <div class="carousel-caption d-none d-md-block">
                    <h1>
                        <strong>Electric Wizard</strong>
                    </h1>
                    <p>Doom Metal Band from Dorset</p>
                </div>
            </div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
    </div>
</div>
    `
})