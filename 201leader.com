<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>人物简介 - PCR</title>
    <link rel="stylesheet" href="yule.css">
</head>
<body>
    <div class="container">
        <header>
            <h1>人物简介</h1>
        </header>
        <section class="profile">
            <img src="pcr.jpg" alt="人物照片" class="profile-image">
            <div class="profile-info">
                <h2>PCR同志</h2>
                <p class="position">201寝寝委常委、后勤部部长</p>
                <p class="description">
                    PCR同志，男，汉族，2007年生，群众，高中学历，现任21班语文课代表（副班级），201寝寝委常委、后勤部部长（副寝级）。
                </p>
            </div>
        </section>
        <footer>
            <p>&copy; 2024 201寝室人事网版权所有</p>
        </footer>
    </div>
</body>
</html>
