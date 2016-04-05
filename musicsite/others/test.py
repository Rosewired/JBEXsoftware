from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont

if __name__ == '__main__':
    asteroid = Image.open("C:\\Users\\Xuan\\Desktop\\resources\\asteroid.png")

    image = Image.new("RGBA", (1200,1146), (0,0,0,0))
    draw = ImageDraw.Draw(image)
    font = ImageFont.truetype("resources/arial.ttf", 200)
    draw.text((10, 0), "hellooooo", (0,0,0), font=font)
    img_resized = image.resize((400,382), Image.ANTIALIAS)

    asteroid.paste(img_resized, (0,0), img_resized)
    
    asteroid.save("C:\\Users\\Xuan\\Desktop\\resources\\test1.png")
