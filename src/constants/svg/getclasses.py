from os import walk
from string import Template

f = []
for (dirpath, dirnames, filenames) in walk('.'):
    f.extend(filenames)
    break

output = []

for file in f:

    first = file.split('.')[0]

    s = Template(
""".$type {
  background-image: url(./$filename);
  background-repeat: no-repeat
}

""")
  
    subbed = s.substitute(filename=file, type=first)

    output.append(subbed)

print(''.join(output))