import requests  # pip install requests
import json
import husl  # pip install husl

# import { hsvaToHsla } from '@uiw/color-convert' # npm i @uiw/color-convert

# NTS RE: USER_PREFERENCES
# user_preferences  should be in dict format.
# relevant values: "hue" int/float, "pastel" bool, "dark" bool, "many_hues" bool, "ccount" int


class colorPalette:
    def __init__(self, user_preferences):  # userprefs should be in dict format
        self.baseColor = "0047AB"  # hex value
        self.colorList = []  # list of hex elements to be filled
        self.userPrefs = user_preferences

        # now Do The Things!
        self.createBaseColor()
        self.api_TCA_call()
        self.paletteSort()

    # step 1: from user inputs, generate base color

    def createBaseColor(self):
        hslValue = [0.0, 0.0, 0.0]

        hslValue[0] = self.userPrefs["hue"]  # whatever main_color hue is

        # if pastel preference is true
        if self.userPrefs["pastel"] == True:
            hslValue[1] = 40
        else:
            hslValue[1] = 95

        # if dark mode preference is true
        if self.userPrefs["dark"] == True:
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
        if self.userPrefs["many_hues"] == True:
            url += "analogic-complement"
        else:
            url += "analogic"

        colorCount = self.userPrefs["ccount"] - 1
        url += "&count=" + colorCount  # replace '6' with user preference num_colors - 1

        jsonReq = requests.get(url)
        jsonLoad = json.load(jsonReq)

        for color in jsonLoad["colors"]:
            self.colorList.append(color["hex"]["clean"])

        # TODO: possibly futz with analogic-complement to get more of the original value in there?
        # colorList should now be a list of hex codes

        return

    # step 3: sort colors to match specific roles in the ui
    def paletteSort(self):
        # rearrange the colors in the palette so that they meet the following order:
        # 1. main windows, 2. background 3. main buttons, 4. alerts, 5. a header/footer, 6. secondary windows
        # this order will be dependent on user preferences (i.e. light or dark mode)
        # TCA generally more or less returns palettes in order from darkest to lightest color

        # if light mode is selected
        if self.userPrefs["dark"] == False:
            # as a starting point, let's just flip the colors for light mode
            # WITH THE EXCEPTION of the original color
            self.colorList[1:] = self.colorList[1:].reverse()

    #####################################
    ### functions for returning stuff ###
    #####################################

    def getPalettes(self):
        return self.colorList

    def getBaseColor(self):
        return self.baseColor
