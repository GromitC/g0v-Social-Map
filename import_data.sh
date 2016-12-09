#!/bin/bash

mongoimport --db hackathon --collection social ./data/hackathon-social.json --jsonArray
mongoimport --db hackathon --collection tiles ./data/hackathon-tiles.json --jsonArray
mongoimport --db hackathon --collection tweets ./data/hackathon-tweets.json --jsonArray