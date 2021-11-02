import json
import colorutils  # pip install colorutils
import requests  # pip install requests
from colorutils import Color

# NOTE RE: USER_PREFERENCES
# user_preferences  should be in dict format.
# relevant values: "main_color" int/float, "neon_pastel" bool, "light_dark" bool, "one_many_hues" bool, "num_colors" int

# TO USE:
# THE COLOR PALETTE IS AUTOMATICALLY GENERATED FROM USER_PREFERENCES ON INITIALIZATION
# WARNING: THIS GENERATOR ASSUMES THAT ALL INPUTS ARE IN THE CORRECT FORMAT! SEE NOTE ABOVE
# THERE ARE GETTERS FOR THE COLOR PALETTE AND BASE COLOR. USE THEM!

# 21-OCT-2021: currently generates a base color + grabs the relevant palette from thecolorapi.com.
# does not yet edit the palette colors for contrast

# 03-NOV-2021: added in a text color item. Has hex value "000000" (black) or "FFFFFF" (white).
# In theory, text for the fake site will be black if darkmode preference is False, white if True.
# I'm still working on it though...

# TODO: include bold/subtle in the palette editing phase i.e. high/low value contrast levels


class colorPalette:
    def __init__(self, user_preferences):  # userprefs should be in dict format
        # DEFINE VARIABLES:
        self.baseColor = Color(hex="0047AB")
        self.colorList = []  # list of hex elements to be filled
        self.txtColor = Color(hex="000000")  # Text color for site
        self.userPrefs = user_preferences

        # now Do The Things!
        self.createBaseColor()
        # if there's only one color, don't bother
        if self.userPrefs["num_colors"] > 1:
            self.api_TCA_call()
            self.paletteSort()

    # step 1: from user inputs, generate base color

    def createBaseColor(self):
        hsvValue = [0, 0, 0]

        # whatever main_color hue is
        hsvValue[0] = self.userPrefs["main_color"]

        # if pastel preference is true
        if self.userPrefs["neon_pastel"] == True:
            hsvValue[1] = .40
        else:
            hsvValue[1] = .95

        # if dark mode preference is true
        if self.userPrefs["light_dark"] == True:
            hsvValue[2] = .40
            self.txtColor = colorutils.Color(hex="FFFFFF")
            # print("tex color should be FFFFFF, is: ", self.txtColor.hex[1:])
        else:
            hsvValue[2] = .75
            self.txtColor = colorutils.Color(hex="000000")
            # print("tex color should be 000000, is: ", self.txtColor.hex[1:])

        self.baseColor = colorutils.Color(
            hsv=(hsvValue[0], hsvValue[1], hsvValue[2]))
        # husl.husl_to_hex(
        #    hsvValue[0], hsvValue[1], hsvValue[2])
        self.colorList.append(self.baseColor.hex[1:])
        return

    # step 2: from base color + user inputs, api color palette

    def api_TCA_call(self):
        url = "https://www.thecolorapi.com/scheme?hex="
        url += self.colorList[0]  # baseColor hex
        url += "&format=json&mode="
        # choose appropriate palette type based on user preferences. HC'd to analogic atm

        # if many hues is true
        if self.userPrefs["one_many_hues"] == True:
            url += "analogic-complement"
        else:
            url += "analogic"

        colorCount = self.userPrefs["num_colors"] - 1
        TCA_Error = False
        if colorCount == 0:
            print("error: no palette. break")
            return
        if colorCount == 1:
            # TCA's api returns more than 1 color if you query for one
            TCA_Error = True
            colorCount = 2

        # replace '6' with user preference num_colors - 1
        url += "&count=" + str(colorCount)

        jsonResp = requests.get(url)

        jsonLoad = jsonResp.json()

        # print("jsonLoad ", jsonLoad)

        if TCA_Error:
            # TCA error: pull ONLY first color
            color = jsonLoad["colors"][0]
            if self.userPrefs["one_many_hues"] != True:
                # analogic: pull 2nd color instead bc it looks better 8^)
                color = jsonLoad["colors"][1]
            self.colorList.append(color["hex"]["clean"])

        else:
            # TCA generates a normal palette. behave normally
            for color in jsonLoad["colors"]:
                self.colorList.append(color["hex"]["clean"])

        # TODO: possibly futz with analogic-complement to get more of the original value in there?
        # colorList should now be a list of hex codes

        print(self.colorList)

        return

    # step 3: sort colors to match specific roles in the ui
    def paletteSort(self):
        # rearrange the colors in the palette so that they meet the following order:
        # 1. main windows, 2. background 3. main buttons, 4. alerts, 5. a header/footer, 6. secondary windows
        # this order will be dependent on user preferences (i.e. light or dark mode)
        # TCA generally more or less returns palettes in order from darkest to lightest color

        # if light mode is selected
        if self.userPrefs["light_dark"] == False:
            # as a starting point, let's just flip the colors for light mode
            # WITH THE EXCEPTION of the original color
            self.colorList[1:].reverse()

    #####################################
    ### functions for returning stuff ###
    #####################################

    def getPalettes(self):
        return self.colorList

    def getBaseColor(self):
        return self.baseColor.hex[1:]

    def getBaseColorHSV(self):
        return self.baseColor.hsv

    def getJsonPalettes(self):
        return json.dumps(self.colorList)
    
    def getTxtColor(self):
        return self.txtColor.hex[1:]
