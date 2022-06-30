#!/bin/bash
wget -O - https://piranha-agenda.isi.edu:4200/ 2>&1 | grep Agenda
