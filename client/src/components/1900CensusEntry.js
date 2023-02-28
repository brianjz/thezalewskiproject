const CensusEntry1900 = (props) => {
    const person = props.person

    return (
		<table className="death-item table table-striped">
			<tbody>
				<tr className="odd">
					<td className="rowName">Year:</td>

					<td className="rowEntry">1900</td>
				</tr>
				
				<tr className="odd">
					<td className="rowName">Ward:</td>

					<td className="rowEntry">{person.ward}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Enumeration District:</td>

					<td className="rowEntry">{person.ed}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Page:</td>

					<td className="rowEntry">{person.page}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Street:</td>

					<td className="rowEntry">{person.street}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">House Number:</td>

					<td className="rowEntry">{person.house}</td>
				</tr>

				<tr className="even">
					<td className="rowName">Dwelling Number:</td>

					<td className="rowEntry">{person.dwelling}</td>
				</tr>

				<tr className="even">
					<td className="rowName">Family Number:</td>

					<td className="rowEntry">{person.family}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Surname:</td>

					<td className="rowEntry">{person.surname}</td>
				</tr>

				<tr className="even">
					<td className="rowName">Given Names:</td>

					<td className="rowEntry">{person.firstname}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Color/Race:</td>

					<td className="rowEntry">{person.color}</td>
				</tr>

				<tr className="even">
					<td className="rowName">Sex/Gender:</td>

					<td className="rowEntry">{person.sex}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Age:</td>

					<td className="rowEntry">{person.age}</td>
				</tr>

				<tr className="even">
					<td className="rowName">Birth Month:</td>

					<td className="rowEntry">{person.birthmonth}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Birth Year:</td>

					<td className="rowEntry">{person.birthyear}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Relation to Head of Household:</td>

					<td className="rowEntry">{person.relation}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Civil:</td>

					<td className="rowEntry">{person.civil}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Years Married:</td>

					<td className="rowEntry">{person.marriedyears}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Children Born:</td>

					<td className="rowEntry">{person.childrenborn}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Children Still Living:</td>

					<td className="rowEntry">{person.childrenliving}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Birthplace:</td>

					<td className="rowEntry">{person.birth}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Father's Birthplace:</td>

					<td className="rowEntry">{person.fatherbirth}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Mother's Birthplace:</td>

					<td className="rowEntry">{person.motherbirth}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Immigration Year:</td>

					<td className="rowEntry">{person.immigration}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Years in US:</td>

					<td className="rowEntry">{person.yearsinus}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Naturalization:</td>

					<td className="rowEntry">{person.naturalization}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Profession:</td>

					<td className="rowEntry">{person.profession}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Months Unemployed:</td>

					<td className="rowEntry">{person.unemployed}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Can Read?:</td>

					<td className="rowEntry">{person._read}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Can Write?:</td>

					<td className="rowEntry">{person._write}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Can Speak English?:</td>

					<td className="rowEntry">{person.speakenglish}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Own or Rent:</td>

					<td className="rowEntry">{person.ownorrent}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Own or Mortgage:</td>

					<td className="rowEntry">{person.ownormortgage}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Farm or House:</td>

					<td className="rowEntry">{person.farmorhouse}</td>
				</tr>

				<tr className="odd">
					<td className="rowName">Farm Schedule:</td>

					<td className="rowEntry">{person.farmschedule}</td>
				</tr>

			</tbody>
		</table>
    )
}

export default CensusEntry1900;