

# Filter only works for rating and price. If addtl filters are added it will break
def filterChecker(item, filter):
    if filter:
        counter = 0
        if filter.get('price', None):
            if float(item['price']) > float(filter['price']):
                counter += 1

        if filter.get('rating', None):
            print(f"User Selected:{int(filter['rating'])} and Product Rating Is: {int(item['rating'])}")
            
            positiveCase = int(item['rating'])  >= int(filter['rating'])
            print(f' So the Product should be inside page? {positiveCase}')
            if not positiveCase:
                print('testing')
                counter += 1

        if counter > 0:
            return False
        else:
            return True
    else:
        return True


def linearSearch(arr, searchTerm, searchFilter):

    # Search inside db_data
    data = []
    for item in arr:
        for search in searchTerm:
            if len(data) > 50:
                break
            for key in item:
                if search.lower() in item[key].lower():
                    isFiltered = filterChecker(item, searchFilter)
                    if isFiltered:
                        data.append(item)
    return data

# Data needs to be sorted somehow
# Implement your own sort
# Limitations: Will only work for SortKey and only look using that
# Search for Multiple things
# Search Reults need to be combined
def binarySearch(arr, sortKey, searchTerm):

    sorted_data = sorted(arr, key=lambda k: k[sortKey])
    print(sorted_data[0:5])

    left = 0
    right = len(sorted_data) - 1
    mid = 0

    data = []
    for search in searchTerm:
        while left <= right:
            mid = (left + right) // 2
            current = sorted_data[mid]

            if current[sortKey] < search:
                left = mid + 1

            elif current[sortKey] > search:
                right = mid -1

            else:
                if search in current[sortKey]:
                        data.append(current)
                        break
    return data
