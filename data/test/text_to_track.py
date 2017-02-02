# -*- coding: utf-8 -*-

"""
    To import into mongodb:

    mongoimport --db spaceracersdb --collection tracks --file <path_to_json> --jsonArray
"""

import os
import sys
import json
import datetime

try:
    fileName = sys.argv[1]
    trackType = sys.argv[2]
except IndexError:
    print('You have to define both a file containing texts and a type for tracks. Exiting...')
    sys.exit()

tracks = []

with open(fileName, 'r') as inFile:
    for line in inFile:
        tracks.append({
            'type': trackType,
            'text': line,
            'createdAt': datetime.datetime.now().isoformat(),
            'updatedAt': datetime.datetime.now().isoformat()
        })

with open(os.path.splitext(fileName)[0] + '.json', 'w') as outfile:
    json.dump(tracks, outfile, ensure_ascii=False)
