import requests  # pip install requests
import json
import husl  # pip install husl

# import { hsvaToHsla } from '@uiw/color-convert' # npm i @uiw/color-convert


class colorPalette:
    def __init__(self, id):  # id is whatever we need to look up user preferences
        self.baseColor = "0047AB"  # hex value
        self.colorList = []  # list of hex elements to be filled

        self.user_preferences = ""  # grab user data api at this point

    # step 1: from user inputs, generate base color

    def createBaseColor(self):
        hslValue = [0.0, 0.0, 0.0]

        hslValue[0] = 0  # whatever main_color hue is

        # if pastel preference is true
        if True:
            hslValue[1] = 40
        else:
            hslValue[1] = 95

        # if dark mode preference is true
        if True:
            hslValue[2] = 40
        else:
            hslValue[2] = 75

        self.baseColor = husl.husl_to_hex(
            hslValue[0], hslValue[1], hslValue[2])
        self.colorList.append(self.baseColor)
        return

    # step 2: from base color + user inputs, api color palette

    def api_TCA_call(self):
        url = "https://www.thecolorapi.com/scheme?hex="
        url += self.baseColor  # baseColor hex
        url += "&format=json&mode="
        # choose appropriate palette type based on user preferences. HC'd to analogic atm

        # if many hues is true
        if True:
            url += "analogic-complement"
        else:
            url += "analogic"

        url += "&count=" + "6"  # replace '6' with user preference num_colors - 1

        jsonReq = requests.get(url)
        jsonLoad = json.load(jsonReq)

        for color in jsonLoad["colors"]:
            self.colorList.append(color["hex"]["clean"])

        # colorList should now be a list of hex codes

        return

    # step 3: sort colors to match specific roles in the ui
    def paletteSort(self):
        # rearrange the colors in the palette so that they meet the following order:
        # 1. main windows, 2. background 3. main buttons, 4. alerts, 5. a header/footer, 6. secondary windows
        # this order will be dependent on user preferences (i.e. light or dark mode)
        # TCA generally more or less returns palettes in order from darkest to lightest color

        # if light mode is selected
        if False:
            # as a starting point, let's just flip the colors for light mode
            # WITH THE EXCEPTION of the original color
            self.colorList[1:] = self.colorList[1:].reverse()
